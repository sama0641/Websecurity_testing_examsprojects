import { useSelector } from "react-redux";

export const imageUrlReturner = () => {
  const fullImageURL = useSelector(
    (store) => store?.user?.user?.profilePicture
  );
  const imageURL = fullImageURL?.substring(7);
  return imageURL;
};
