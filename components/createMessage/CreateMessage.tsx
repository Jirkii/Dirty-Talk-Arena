import axios from "axios";
import { useEffect, useState } from "react";
import Select, { GroupBase } from "react-select";
import { mutate } from "swr";

interface User {
  id: number;
  name: string;
  bgColor: string;
  icon: string;
}

interface OptionType {
  value: number;
  label: string;
  bgColor: string;
  icon: string;
}

type OptionOrGroup = OptionType | GroupBase<OptionType>;

const CreateMessage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<OptionType | null>(null);
  const [messageContent, setMessageContent] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const refreshMessages = () => {
    mutate("/api/messages");
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "#363636",
      color: "white",
      fontSize: "12px",
      minHeight: "25px",
      padding: "6px",
      width: "250px",
      alignItems: "center",
      boxShadow: "none",
      border: state.isFocused ? "1px solid #C2C2C2" : "1px solid transparent",
      "&:hover": {
        borderColor: state.isFocused ? "#C2C2C2" : "transparent",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "darkgray"
        : state.isFocused
        ? "lightgray"
        : "#363636",
      borderColor: "#363636",
      borderWidth: "1px",
      borderStyle: "solid",
      color: "white",
      fontSize: "12px",
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      height: "25px",
      color: "white",
      "&:hover": {
        color: "white",
      },
      backgroundRepeat: "no-repeat",
      width: "25px",
      "&:after": {
        content: "none",
      },
      display: "flex",
      alignItems: "center",
      padding: 0,
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    placeholder: provided => ({
      ...provided,
      color: "white",
      fontWeight: 500,
    }),
    menuList: provided => ({
      ...provided,
      padding: "0px",
    }),
    singleValue: provided => ({
      ...provided,
      color: "white",
    }),
  };
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

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!selectedUser || !messageContent) {
      console.error("Please select a user and enter a message");
      return;
    }

    try {
      const response = await axios.post("/api/messages", {
        userId: selectedUser.value,
        content: messageContent,
      });
      setInfoMessage("Zpráva vytvořena");

      setTimeout(() => {
        setInfoMessage("");
      }, 10000);
    } catch (error) {
      setErrorMessage("Chyba při vytváření hlášky");
      setTimeout(() => {
        setErrorMessage("");
      }, 10000);
    }
    refreshMessages();

    setMessageContent("");
    setSelectedUser(null);
  };

  const options: OptionOrGroup[] = users.map(({ id, name, bgColor, icon }) => {
    return { value: id, label: name, bgColor: bgColor, icon: icon };
  });

  function classNames(arg0: string): string | undefined {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="mb-10">
      {(infoMessage || errorMessage) && (
        <div
          className={
            infoMessage
              ? "bg-green text-white px-3 py-2 rounded font-medium"
              : "bg-red-500 text-white px-3 py-2 rounded font-medium"
          }
        >
          {infoMessage}
        </div>
      )}
      <div className="pb-10 pt-5">
        <form onSubmit={handleSubmit} className="px-5 md:px-0">
          <textarea
            id="textarea"
            className="bg-black-input p-3 w-full rounded text-xs md:text-sm focus:outline-none focus:ring-1 focus:border-transparent focus:ring-black-textInput text-black-textInput"
            placeholder="Vepište hlášku..."
            onChange={e => setMessageContent(e.target.value)}
            value={messageContent}
          />
          <div className="flex justify-between items-center mt-1 flex-wrap">
            <div className="flex flex-col">
              <Select
                name="users"
                id="users"
                onChange={(selectedOption: OptionType | null) => {
                  setSelectedUser(selectedOption);
                }}
                value={selectedUser}
                options={options}
                styles={customStyles}
                formatOptionLabel={({ label, bgColor, icon }) => (
                  <div className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full`}
                      style={{ backgroundColor: bgColor }}
                    >
                      <img src={`/img/user-monkeys/${icon}`} />
                    </div>
                    <span className="ml-3">{label}</span>
                  </div>
                )}
                placeholder="Uživatel"
              />
            </div>
            <button
              className="px-8 py-2 font-bold text-sm bg-blue-bg rounded hover:bg-black transition-colors mt-2 md:mt-0"
              type="submit"
            >
              Přidat
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMessage;
