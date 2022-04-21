import { useEffect, useState, useContext } from "react";
import { FirebaseContext } from "../context/firebase";

export default function useContent(target) {
  const [content, setContent] = useState(
    JSON.parse(localStorage.getItem(target))
  );
  const { firebase } = useContext(FirebaseContext);
  console.log(content);
  console.log(!content);
  useEffect(() => {
    if (!content) {
      console.log(content);
      firebase
        .firestore()
        .collection(target)
        .get()
        .then((snapshot) => {
          const allContent = snapshot.docs.map((contentObj) => ({
            ...contentObj.data(),
            docId: contentObj.id,
          }));
          localStorage.setItem(target, JSON.stringify(allContent));
          setContent(allContent);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, []);

  return { [target]: content };
}
