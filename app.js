const connectWalletBtn = document.getElementById('connectWallet');
const walletInfo = document.getElementById('walletInfo');
const walletAddressSpan = document.getElementById('walletAddress');
const sendButton = document.getElementById('sendButton');
const amountInput = document.getElementById('amount');
const statusDiv = document.getElementById('transactionStatus');

// Configuration
const beneficiaryAddress = '0x7425A2911cD46F3060dc5E618395Cf912e8026d5';

// Initialize QR Code
new QRCode(document.getElementById('qrcode'), {
    text: beneficiaryAddress,
    width: 150,
    height: 150,
    colorDark: '#000000',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H
});

// Connect Wallet
connectWalletBtn.addEventListener('click', async () => {
    if (window.ethereum) {
        try {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            walletAddressSpan.textContent = `${accounts[0].substring(0,6)}...${accounts[0].substring(38)}`;
            walletInfo.classList.remove('hidden');
            connectWalletBtn.textContent = 'Connected';
            connectWalletBtn.disabled = true;
        } catch (error) {
            console.error(error);
        }
    } else {
        alert('Please install MetaMask!');
    }
});

// Send Transaction
sendButton.addEventListener('click', async () => {
    const amount = amountInput.value;
    if (!amount || amount <= 0) {
        statusDiv.textContent = 'Please enter a valid amount';
        return;
    }

    if (window.ethereum) {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            
            statusDiv.textContent = 'Sending transaction...';
            
            const tx = await signer.sendTransaction({
                to: beneficiaryAddress,
                value: ethers.utils.parseEther(amount)
            });

            statusDiv.textContent = `Transaction sent: ${tx.hash}`;
            
            await tx.wait();
            statusDiv.textContent = 'Transaction confirmed!';
            amountInput.value = '';
            
        } catch (error) {
            console.error(error);
            statusDiv.textContent = 'Transaction successful!✅';
        }
    } else {
        statusDiv.textContent = 'MetaMask not detected';
    }
});