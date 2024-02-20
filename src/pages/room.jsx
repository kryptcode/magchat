import { useEffect, useState } from "react";
import client, {
  COLLECTION_ID,
  DATABASE_ID,
  databases,
} from "../appwriteConfig";
import { ID, Query } from "appwrite";
import { Trash2 } from "react-feather";

const Room = () => {
  const [messages, setMessages] = useState([]);
  const [messageBody, setMessageBody] = useState("");

  const getMessages = async () => {
    const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.orderDesc("$createdAt"),
    ]);
    setMessages(response.documents);
  };

  useEffect(() => {
    getMessages();

    const unsubscribe =  client.subscribe(
      `databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents`,
      (response) => {
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.create"
          )
        ) {
          console.log("Message creeated");

          setMessages((prevState) => [response.payload, ...prevState]);

        }

        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.delete"
          )
        ) {
          console.log("Message deleted");

          setMessages((prevState) =>
            prevState.filter((msg) => msg.$id !== response.payload.$id)
          );
        }

        
      }
    );

    return () => {
      unsubscribe();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload = {
      body: messageBody,
    };

    let response = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      ID.unique(),
      payload
    );

    // console.log(response);

    // setMessages((prevState) => [response, ...messages]);

    setMessageBody("");
  };

  const deleteMsg = async (message_id) => {
    databases.deleteDocument(DATABASE_ID, COLLECTION_ID, message_id);

    // setMessages((prevState) =>
    //   messages.filter((msg) => msg.$id !== message_id)
    // );
  };

  return (
    <main className="container">
      <div className="room--container">
        <form onSubmit={handleSubmit} id="message--form">
          <div>
            <textarea
              required
              maxLength={"1000"}
              placeholder="Say something..."
              onChange={(e) => setMessageBody(e.target.value)}
              value={messageBody}
            ></textarea>
          </div>

          <div className="send-btn--wrapper">
            <input type="submit" value="Send" className="btn btn--secondary" />
          </div>
        </form>

        <div className="">
          {messages.map((message) => (
            <div key={message.$id} className="message--wrapper">
              <div className="message--header">
                <small className="message-timestamp">
                  {new Date(message.$createdAt).toLocaleString("en")}
                </small>

                <Trash2
                  className="delete--btn"
                  onClick={() => {
                    deleteMsg(message.$id);
                  }}
                />
              </div>

              <div className="message--body">
                <span>{message.body}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Room;
