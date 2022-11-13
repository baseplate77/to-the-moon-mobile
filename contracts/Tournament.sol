// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { ReentrancyGuard } from "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Tournament is Ownable, ReentrancyGuard {

    struct PlayerStats {

        bool hasJoined;

        uint score;

        uint allocatedPrize;

        uint unclaimedPrize;
    }

    uint public id;

    string public name;

    uint public startTime;

    address[] public playerList;

    mapping(address => PlayerStats) public players;

    constructor(uint id_, string memory name_, uint startTime_) {
        id = id_;
        name = name_;
        startTime = startTime_;
    }

    function joinTournament() external payable {
        PlayerStats storage player = players[msg.sender];

        if(!player.hasJoined) {
            playerList.push(msg.sender);
            player.hasJoined = true;
        }
    }

    function recordScore(address _player, uint _score) external onlyOwner {
        players[_player].score = _score;
    }

    function endTournament() external onlyOwner {
        // Sort playerList by score

        // Calculate 'a' value from r_values

        // Calculate and assign reward for each address
    }

}