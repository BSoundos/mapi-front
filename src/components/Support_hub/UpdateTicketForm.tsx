import CheckboxInput from "../ui/CheckBoxInput";

const UpdateTicketForm = ({
  isOpen,
  name,
  title,
  choices ,
  selectedChoice,
  setSelectedChoice,
  updateMessage,
  setUpdateMessage ,
  onSubmit,
  onClose,
  hasMessage = true,
}) => {
  if (!isOpen) {
    return null; // Do not render if the modal is not open
  }


  return (
    
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-mapi-neutral-1 pt-6 pb-4 mt-3 px-6 rounded-md w-1/2">
        <h2 className="text-lg font-semibold mb-8 text-white pb-2 border-b-[#404040] border-b">
          Update Ticket {title}
        </h2>

        <form onSubmit={onSubmit}>
          <div className="flex flex-col gap-6 px-3">
          <div className="mb-4 flex gap-6 items-center">
           <label htmlFor="quota-type" className="text-sm font-semibold text-mapi-text w-32">
                Status
            </label>
            <div className="mb-4 flex flex-col gap-6 items-start">
              {choices.map((choice, index) => (
                <CheckboxInput
                id={index}
                name={name}
                value={choice.value}
                checked={selectedChoice === choice.value}
                label= {choice.label} 
                onChange={() => {
                  setSelectedChoice(choice.value)
                }
                }
                disabled={false}
              />
              ))}
            </div>
            </div>

            {
              hasMessage &&
              ( <div className="mb-4 flex gap-6 items-center">
              <label htmlFor="quota-type" className="text-sm font-semibold text-mapi-text w-36">
                   Update Message(optional)
               </label>
               <textarea
                  id="updateMessage"
                  value={updateMessage}
                  onChange={(e) => setUpdateMessage(e.target.value)}
                  className="add-plan w-60 h-20"
                />
              </div>)
            }
            

            <div className="flex justify-end gap-4">
              <button type="button" onClick={onClose} className="text-base py-2 px-4 text-white">
                Cancel
              </button>
              <button type="submit" className="bg-primary-dark border font-bold text-base py-2 px-16 rounded-md text-white">
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTicketForm;
