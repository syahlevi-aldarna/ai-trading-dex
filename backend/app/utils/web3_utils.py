from web3 import Web3
from eth_account.messages import encode_defunct
import json

class Web3Utils:
    def __init__(self, provider_url: str):
        self.w3 = Web3(Web3.HTTPProvider(provider_url))
    
    def verify_signature(self, message: str, signature: str, address: str) -> bool:
        message_hash = encode_defunct(text=message)
        recovered_address = self.w3.eth.account.recover_message(
            message_hash, signature=signature
        )
        return recovered_address.lower() == address.lower()
    
    def get_contract(self, address: str, abi_path: str):
        with open(abi_path) as f:
            abi = json.load(f)
        return self.w3.eth.contract(address=address, abi=abi) 