// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {EnumerableSet} from "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "./Tournament.sol";

contract ToTheMoon is Ownable, ReentrancyGuard {
    struct PlayerStruct {
        bool hasRegistered;
        string username;
        EnumerableSet.AddressSet tournaments;
    }

    struct TournamentStruct {
        string name;
        uint256 startTime;
        address contractAddress;
    }

    mapping(address => PlayerStruct) players;

    mapping(uint256 => TournamentStruct) public tournaments;

    mapping(uint256 => uint256) public r_values;

    uint256 public currentTournamentId;

    // 24 hours
    uint256 public timeLimit = 86400;

    function register(string memory _name) external {
        PlayerStruct storage player = players[msg.sender];
        if (!player.hasRegistered) {
            player.username = Strings.toHexString(
                uint256(uint160(msg.sender)),
                20
            );
            player.hasRegistered = true;
        }
    }

    function createTournament(string memory _name) external onlyOwner {
        require(
            tournaments[currentTournamentId].startTime + timeLimit <
                block.timestamp,
            "Tournament is still live"
        );

        Tournament tournament = new Tournament(
            ++currentTournamentId,
            _name,
            block.timestamp
        );
        tournaments[currentTournamentId] = TournamentStruct(
            _name,
            block.timestamp,
            address(tournament)
        );
    }

    function recordScore(address _player, uint256 _score) external onlyOwner {
        require(
            tournaments[currentTournamentId].startTime + timeLimit >
                block.timestamp,
            "Tournament is not live"
        );
        Tournament(tournaments[currentTournamentId].contractAddress)
            .recordScore(_player, _score);
    }

    function endTournament() external onlyOwner {
        require(
            tournaments[currentTournamentId].startTime + timeLimit <
                block.timestamp,
            "Tournament is still live"
        );
        Tournament(tournaments[currentTournamentId].contractAddress)
            .endTournament();
    }
}

