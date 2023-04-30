import { useEffect, useState } from "react";
import emailValidation from '../../utils/emailValidation';
import { useGetUserQuery } from "../../features/users/usersApi";
import Error from '../ui/Error';
import { useDispatch, useSelector } from "react-redux";
import { conversationApi, useAddConversationMutation, useEditConversationMutation } from "../../features/conversation/conversationApi";


export default function Modal({ open, control }) {
    const [to, setTo] = useState('');
    const [message, setMessage] = useState('');
    const [userCheck, setUserCheck] = useState(false);
    const [resError, setResError] = useState(false);
    const [converstation, setConversation] = useState(undefined);

    const dispatch = useDispatch();
    const { user: loggedInUser } = useSelector((state) => state.auth) || {};

    const [addConversation, { isSuccess: isAddConversationSuccess }] = useAddConversationMutation();
    const [editConversation, { isSuccess: isEditConversationSuccess }] = useEditConversationMutation()
    const { email: userEmail } = loggedInUser || {}

    const { data: participant, isLoading, isError, error } = useGetUserQuery(to, { skip: !userCheck });

    useEffect(() => {
        if (participant?.length > 0 && participant[0].email !== userEmail) {
            dispatch(conversationApi.endpoints.getConversation.initiate(
                { userEmail: userEmail, participantEmail: to }
            )).unwrap().then((data) => {
                setConversation(data);
            }).catch(err => setResError("Something Went Wrong!"))
        }
    }, [dispatch, to, userEmail, participant])

    //handle modal close depenedece succes or not
    useEffect(() => {
        if(isAddConversationSuccess || isEditConversationSuccess){
            control();
        }
    }, [isAddConversationSuccess, isEditConversationSuccess])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (converstation?.length > 0) {
            editConversation({
                id: converstation[0].id,
                sender: userEmail,
                data: {
                    participants: `${userEmail}-${participant[0].email}`,
                    users: [loggedInUser, participant[0]],
                    message,
                    timestamp: new Date().getTime()
                }

            })
        } else if (converstation?.length === 0) {
            addConversation({
                sender: userEmail,
                data:{
                    participants: `${userEmail}-${participant[0].email}`,
                    users: [loggedInUser, participant[0]],
                    message,
                    timestamp: new Date().getTime()
                }
            })
        }
    }
    const debounceHandler = (fn, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                fn(...args);
            }, delay);
        }
    }
    const doSearch = (value) => {
        if (emailValidation(value)) {
            setUserCheck(true);
            setTo(value);
        }
    }
    const handleSearch = debounceHandler(doSearch, 500);
    return (
        open && (
            <>
                <div
                    onClick={control}
                    className="fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer"
                ></div>
                <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Send message
                    </h2>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="to" className="sr-only">
                                    To
                                </label>
                                <input
                                    id="to"
                                    name="to"
                                    type="email"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                    placeholder="Send to"
                                    onChange={(e) => handleSearch(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="sr-only">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    type="message"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                    placeholder="Message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                disabled={converstation === undefined || (participant?.length > 0 && participant[0]?.email === userEmail)}
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                            >
                                Send Message
                            </button>
                        </div>
                        {participant?.length === 0 && <Error message="Email doesn not exist" />}
                        {participant?.length > 0 && participant[0]?.email === userEmail && <Error message="You can send message to yourself" />}
                        {resError && <Error message={resError} />}

                    </form>
                </div>
            </>
        )
    );
}
