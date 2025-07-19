📡 YouTube Live Monitor with WhatsApp Alerts

This is a Node.js application that monitors a specific YouTube channel for live stream activity and sends real-time alerts to a WhatsApp group when the stream starts or ends.

> 🔧 Built for internal use at the office, but designed as a portfolio-grade project for potential future expansion.

🚀 Features

- ✅ Monitors YouTube livestream status using the YouTube Data API
- ✅ Sends WhatsApp notifications via group messages using Baileys or similar library
- ✅ Detects transitions: `OFF → ON`, `ON → OFF`, and initial states
- ✅ Error handling and rate-limited error reporting
- ✅ Modular and well-structured codebase
- ✅ Docker-ready for easy deployment anywhere

🧠 Use Case
This was built for an office to ensure a scheduled live stream is not accidentally left **OFFLINE**. If the stream ends unexpectedly or isn’t started in time, the app will notify the group.

📁 Project Structure

📦 root
├── config/ # Config management
├── lib/ # WhatsApp integration logic
├── live_state/ # In-memory status tracking
├── monitor/ # Stream monitor core logic
├── services/ # YouTube live status service
├── scripts/ # Optional manual trigger scripts
├── .env # Environment variables (not committed)
└── index.js # App entry point

⚙️ Setup Instructions

1. Clone the Repo

git clone https://github.com/yourusername/youtube-live-monitor.git
cd youtube-live-monitor

2. Install Dependencies

npm install

3. Create `.env` File

YOUTUBE_CHANNEL_ID=your_channel_id
YOUTUBE_API_KEY=your_api_key
WHATSAPP_SESSION=your_whatsapp_auth
WHATSAPP_GROUP_NAME=your_group_name

🧪 Run the App

node index.js

The app will start monitoring immediately and check every 60 seconds by default.

📌 Future Enhancements

- [ ] Admin panel for manual triggers and control
- [ ] Multi-channel support
- [ ] Email/Telegram fallback alerts
- [ ] Persistent status tracking (e.g., Redis or file-based)

👨‍💻 Author

Md Fahad Farazi

- 🔗 [GitHub](https://github.com/yourusername)

📝 License

MIT License – use freely with attribution.
