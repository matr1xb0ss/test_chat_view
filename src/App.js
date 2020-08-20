import React, { useState, useEffect } from 'react';
import './App.css';
import { firestore } from "./firebase";
import { Skeleton, Switch, Card, Avatar, Collapse } from 'antd';
import { CloseOutlined } from '@ant-design/icons';


const { Meta } = Card;
const { Panel } = Collapse;

function App() {
  const [userData, setUserData] = useState({});
  const [flightsData, setFlightsData] = useState({});
  const [userDataLoading, setUserDataLoading] = useState(true);
  const [flightsDataLoading, setFlightsDataLoading] = useState(true);
  const [reloadUserData, setReloadUserData] = useState(false);

  const users = firestore.doc("users/QG11whYBHMFP5aN3Yw4X");


  // Effects

  useEffect(() => {
    users.get().then((doc) => {
      if (doc && doc.exists) {
        const myData = doc.data();
        if (myData) {
          setUserData(myData);
          setUserDataLoading(false);
        }
      }
    }).catch((error) => {
      console.log(error)
    });

    const flights = firestore.doc("flights/kgMCksXtSZNhTBbFBDGc");
    flights.get().then((doc) => {
      if (doc && doc.exists) {
        const myData = doc.data();
        if (myData) {
          setFlightsData(myData);
          setFlightsDataLoading(false);
        }
      }
    }).catch((error) => {
      console.log(error)
    });
  }, []);

  useEffect(() => {
    if (reloadUserData) {
      users.get().then((doc) => {
        if (doc && doc.exists) {
          const myData = doc.data();
          if (myData) {
            setUserData(myData);
            setUserDataLoading(false);
            setReloadUserData(false)
          }
        }
      }).catch((error) => {
        console.log(error)
      });
    }
  }, [reloadUserData]);


  // Methods

  const handleBotSwitch = (checked) => {
    users.update({
      pause_bot: !checked,
    }).then(() => {
      console.log("Success")
      setReloadUserData(true);
    }).catch((error) => {
      console.log(error)
    });
  };


  // Render

  return (
    <div className="App">
      <div className="main-layout">
        <>
          <CloseOutlined className="close-icon" />
          <Card
            bordered={false}
            style={{ width: 300 }}
          >
            <Skeleton loading={userDataLoading && flightsDataLoading} avatar active>
              <Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={userData && userData.name}
              />
              <div className="card-email">
                {`email: ${userData && userData.email}`}
              </div>
              <div className="card-phone">
                {`phone:  ${userData && userData.phone}`}
              </div>
              <div className="bot-switch">
                <div  className="bot-switch-text">Enable bot:</div>
                <Switch
                  checked={userData && !userData.pause_bot}
                  onChange={handleBotSwitch}
                />
              </div>

              <div className="flights-wrapper">
                <Collapse>
                  <Panel header="Flights" key="1">
                    <div className="flight-info">
                      <div className="flight-info-title">
                        Flight <b>#{flightsData.flight_no}</b>
                      </div>
                      <div className="flight-field">
                        <span>Flight Status:</span>
                        <p>{flightsData.status}</p>
                      </div>
                      <div className="flight-field">
                        <span>From City:</span>
                        <p>{flightsData.from_city}</p>
                      </div>
                      <div className="flight-field">
                        <span>To City:</span>
                        <p>{flightsData.to_city}</p>
                      </div>
                      <div className="flight-field">
                        <span>From:</span>
                        <p>{flightsData.from}</p>
                      </div>
                      <div className="flight-field">
                        <span>To:</span>
                        <p>{flightsData.to}</p>
                      </div>
                      <div className="flight-field">
                        <span>Carrier:</span>
                        <p>{flightsData.carrier}</p>
                      </div>
                      <div className="flight-field">
                        <span>Arrival:</span>
                        {/*<p>{flightsData.arrival}</p>*/}
                      </div>
                      <div className="flight-field">
                        <span>Departure:</span>
                        {/*<p>{flightsData.departure}</p>*/}
                      </div>
                      <div className="flight-field">
                        <span>Arrival Difference:</span>
                        <p>{flightsData.arrival_diff}</p>
                      </div>
                      <div className="flight-field">
                        <span>Departure Difference:</span>
                        <p>{flightsData.departure_diff}</p>
                      </div>
                    </div>
                  </Panel>
                </Collapse>
              </div>
            </Skeleton>
          </Card>
        </>
      </div>
    </div>
  );
}

export default App;
