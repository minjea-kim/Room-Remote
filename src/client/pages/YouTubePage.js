import React, { useRef, useEffect, useState } from "react";
import { useLocation } from "react-router";
import socketIOClient from "socket.io-client";
import axios from "axios";
import "./css/youtube.scss";

const SOCKET_SERVER = "http://localhost:3000";

const SessionPage = () => {
  const location = useLocation();
  const roomID = location.state.roomID;
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [queueItems, updateQueueItems] = useState([]);
  const [showSearchForm, toggleShowSearchForm] = useState(true);
  const socketRef = useRef();

  // Create Socket connection
  useEffect(() => {
    console.log(roomID);
    socketRef.current = socketIOClient(SOCKET_SERVER, {
      query: { roomID },
    });
  }, []);

  // Search for YouTube Video
  function searchYouTube() {
    console.log(searchTerm);
    axios
      .post("http://localhost:3000/youtube", { searchTerm: searchTerm })
      .then(
        (res) => {
          console.log(res.data);
          setSearchResults(res.data);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  function addToQueue(newItem) {
    toggleShowSearchForm(false);
    setSearchResults([]);
    updateQueueItems((queueItems) => [...queueItems, newItem]);
    console.log(newItem);
    console.log(queueItems);
  }

  function removeQueueItem(index) {
    console.log("removing queue item");
    updateQueueItems((queueItems) =>
      queueItems.filter((item, i) => i !== index)
    );
  }

  return (
    <div>
      <div className="youtube-page" id="mobile">
        {showSearchForm ? (
          <div className="search-form">
            <div className="container">
              <div className="header">
                <button
                  className="exit-search-form"
                  onClick={() => toggleShowSearchForm(false)}
                >
                  &times;
                </button>
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={searchYouTube}>Send</button>
              </div>

              <div className="results">
                {searchResults.map((result, index) => (
                  <div onClick={() => addToQueue(result)}>
                    <div className="search-result" key={index}>
                      <img src={result.thumbnail} />
                      <div className="text">
                        <p className="title">{result.title}</p>
                        <br />
                        <p className="author">{result.author.name}</p>
                      </div>
                    </div>

                    <div className="divider"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}

        <div className="container">
          {roomID}

          <div className="queue">
            {queueItems.length != 0 ? (
              <div className="current-item-thumbnail">
                <img src={queueItems[0].thumbnail} />
              </div>
            ) : (
              <div></div>
            )}

            <div className="queue-items">
              {queueItems.map((item, index) => (
                <div key={index} className="queue-item">
                  <p className="title">{item.title}</p>
                  <button onClick={() => removeQueueItem(index)}>
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
          <button
            className="add-item"
            onClick={() => toggleShowSearchForm(true)}
          >
            +
          </button>
        </div>
      </div>
      <div className="youtube-page" id="desktop"></div>
    </div>
  );
};

export default SessionPage;
