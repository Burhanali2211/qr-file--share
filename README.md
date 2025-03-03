# QR File Sharing

A simple and efficient file-sharing tool that allows users to share files using QR codes. This project generates a QR code for a selected file, which can be scanned to download the file on another device.

## Features
- Generate QR codes for file sharing
- Scan QR codes to download files
- Works across multiple devices (PC, mobile, tablets)
- No need for external cloud storage
- Simple and user-friendly interface

## How It Works
1. **Select a file**: Choose the file you want to share.
2. **Generate QR Code**: The application encodes the file’s download link into a QR code.
3. **Scan the QR Code**: Use any QR code scanner to access the file on another device.
4. **Download the File**: The file is downloaded securely on the receiving device.

## Installation
### Prerequisites
- Python 3.x
- Required Python libraries: `qrcode`, `Flask` (for local file hosting)

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/Burhanali2211/qr-file--share.git
   cd qr-file-sharing
   ```
2. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
3. Run the application:
   ```sh
   python app.py
   ```
4. Open the generated link in a browser and scan the QR code to download files.

## Usage
- Run the script and follow on-screen instructions.
- The QR code can be scanned using any smartphone or QR scanner app.
- The receiver downloads the file via the generated URL.

## Technologies Used
- Python
- Flask (for hosting files)
- qrcode (for QR code generation)

## Future Enhancements
- Add a web-based UI for file selection and sharing
- Implement encryption for secure file transfers
- Enable direct sharing without an internet connection using local P2P networking

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing
Feel free to fork this repository, make improvements, and submit pull requests. Contributions are always welcome!

## Contact
For any issues or suggestions, open an issue or reach out at `gamingcristy19@gmail.com`.
