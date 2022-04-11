"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CryptoJS = require("crypto-js");
class Block {
    constructor(index, hash, previousHash, data, timestamp) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}
Block.calculateBlockHash = (index, previousHash, timestamp, data) => CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
Block.validateStructure = (aBlock) => typeof aBlock.index === "number" &&
    typeof aBlock.hash === "string" &&
    typeof aBlock.previousHash === "string" &&
    typeof aBlock.timestamp === "number" &&
    typeof aBlock.data === "string";
const genesisBlock = new Block(0, "firstHash", "", "Hello", 123456);
let blockChain = [genesisBlock];
const getBlockChain = () => blockChain;
const getLatestBlock = () => blockChain[blockChain.length - 1];
const getNewTimeStamp = () => Math.round(new Date().getTime() / 1000);
const createNewBlock = (data) => {
    const previosBlock = getLatestBlock();
    const newIndex = previosBlock.index + 1;
    const newTimestamp = getNewTimeStamp();
    const nextHash = Block.calculateBlockHash(newIndex, previosBlock.hash, newTimestamp, data);
    const newBlock = new Block(newIndex, nextHash, previosBlock.hash, data, newTimestamp);
    addBlock(newBlock);
    return newBlock;
};
const getHashforBlock = (aBlock) => Block.calculateBlockHash(aBlock.index, aBlock.previousHash, aBlock.timestamp, aBlock.data);
const isBlockValid = (candidateBlock, previousBlock) => {
    if (!Block.validateStructure(candidateBlock)) {
        return false;
    }
    else if (previousBlock.index + 1 !== candidateBlock.index) {
        return false;
    }
    else if (previousBlock.hash !== candidateBlock.previousHash) {
        return false;
    }
    else if (getHashforBlock(candidateBlock) !== candidateBlock.hash) {
        return false;
    }
    else {
        return true;
    }
};
const addBlock = (candidateBlock) => {
    if (isBlockValid(candidateBlock, getLatestBlock())) {
        blockChain.push(candidateBlock);
    }
};
createNewBlock("1st");
createNewBlock("2nd");
createNewBlock("3rd");
console.log(blockChain);
//# sourceMappingURL=index.js.map