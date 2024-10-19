export default function TeamComponent({
  setOpenProfile,
  setCompleteModal,
  setGetModel,
  setStartModal,
}) {
  const buttons = [
    { label: "Start Shipment", action: setStartModal },
    { label: "Complete Shipment", action: setCompleteModal },
    { label: "Shipment Details", action: setGetModel },
  ];

  const openModalBox = (action) => {
    action(true);
  };

  return (
    <section>
      <div className="max-w-screen-lg mx-auto px-4 md:px-8">
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {buttons.map((button, index) => (
              <li key={index}>
                <button
                  onClick={() => openModalBox(button.action)}
                  className="w-full h-24 flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
                >
                  {button.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
    </section>
  );
}
