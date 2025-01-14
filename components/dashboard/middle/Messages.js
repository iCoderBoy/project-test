export function Messages() {
    const messagesData = [
      {
        id: 1,
        senderName: "John Doe",
        time: "10:30 AM",
        message: "Meeting rescheduled to 3 PM.",
        color: "#007bff",
        initials: "JD",
        attachments: [],
      },
      {
        id: 1,
        senderName: "John Doe",
        time: "10:30 AM",
        message: "Meeting rescheduled to 3 PM.",
        color: "#007bff",
        initials: "JD",
        attachments: [],
      },
      {
        id: 1,
        senderName: "John Doe",
        time: "10:30 AM",
        message: "Meeting rescheduled to 3 PM.",
        color: "#007bff",
        initials: "JD",
        attachments: [],
      },
      
      // Add more message objects here...
    ];
  
    return (
      <div className="bg-white rounded-[25px] p-4 border border-gray-200 w-full h-full">
        <div className="chart-header flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Messages</h3>
          <a href="/messages" className="text-blue-500 font-medium">View all</a>
        </div>
        <div className="messages-box flex flex-col gap-4">
          {messagesData.map((message) => (
            <div key={message.id} className="message-item flex items-start border-t border-gray-300 pt-4">
              <div
                className="avatar w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mr-4"
                style={{ backgroundColor: message.color }}
              >
                {message.initials}
              </div>
              <div className="message-content flex-1">
                <div className="message-header flex justify-between">
                  <h4 className="font-bold">{message.senderName}</h4>
                  <span className="text-sm text-gray-500">{message.time}</span>
                </div>
                <p className="text-sm text-gray-600">{message.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }