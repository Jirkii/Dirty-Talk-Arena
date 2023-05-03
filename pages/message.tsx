import Primary from "@/components/primary/Primary";
import { useEffect, useState } from "react";
import axios from "axios";

function Message() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/api/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }

    fetchData();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    console.log(selectedUser);
    console.log(messageContent);
    if (!selectedUser || !messageContent) {
      console.error("Please select a user and enter a message");
      return;
    }

    try {
      const response = await axios.post("/api/messages", {
        userId: selectedUser,
        content: messageContent,
      });
      console.log("Message created:", response.data);
      setInfoMessage("Zpráva vytvořena");
    } catch (error) {
      console.error("Error creating message:", error);
      setInfoMessage("Chyba při vytváření hlášky");
    }
  };

  return (
    <Primary>
      <div className="max-w-2xl mx-auto shadow-topic my-20 rounded-lg">
        {infoMessage && (
          <div className="bg-green-500 text-white px-3 py-2 rounded-t mb-4 font-medium">
            {infoMessage}
          </div>
        )}
        <div className="max-w-md mx-auto py-10">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mb-3">
              <label htmlFor="users" className="mb-2">
                Pro hráče:
              </label>
              <select
                name="users"
                id="users"
                className="border-primary border rounded-lg px-2 py-3"
                onChange={e => {
                  setSelectedUser(e.target.value);
                  console.log(e.target.value);
                }}
                value={selectedUser}
              >
                <option id="none" value="Vyberte uživatele">
                  Vyberte uživatele
                </option>
                {users.map(({ id, name }) => {
                  return (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="textarea" className="mb-2">
                Hláška:
              </label>
              <textarea
                id="textarea"
                className="border-primary border rounded-lg px-2 py-3"
                onChange={e => setMessageContent(e.target.value)}
              ></textarea>
            </div>
            <button
              className="mt-10 border-primary border px-6 py-3 rounded-lg bg-secondary text-white font-medium hover:bg-black transition-colors"
              type="submit"
            >
              Přidat hlášku
            </button>
          </form>
        </div>
      </div>
    </Primary>
  );
}

export default Message;
