const getPartnerInfo = (participants, email) => {
  return participants.find(item => item.email !== email);
}
export default getPartnerInfo