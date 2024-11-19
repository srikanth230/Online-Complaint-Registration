import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import { Button } from 'react-bootstrap';
import ChatWindow from '../common/ChatWindow';
import Collapse from 'react-bootstrap/Collapse';

const Status = () => {
  const [toggle, setToggle] = useState({});
  const [statusCompliants, setStatusCompliants] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const { _id } = user;

    axios
      .get(`http://localhost:8000/status/${_id}`)
      .then((res) => {
        setStatusCompliants(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleToggle = (complaintId) => {
    setToggle((prevState) => ({
      ...prevState,
      [complaintId]: !prevState[complaintId],
    }));
  };

  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap', margin: '20px', justifyContent: 'center' }}>
        {statusCompliants.length > 0 ? (
          statusCompliants.map((complaint, index) => {
            const open = toggle[complaint._id] || false;
            return (
              <Card
                key={index}
                style={{
                  width: '18.5rem',
                  margin: '15px',
                  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                  border: 'none',
                }}
              >
                <Card.Body>
                  <Card.Title style={{ fontWeight: 'bold', color: '#37474F' }}>
                    Name: {complaint.name}
                  </Card.Title>
                  <Card.Text>Address: {complaint.address}</Card.Text>
                  <Card.Text>City: {complaint.city}</Card.Text>
                  <Card.Text>State: {complaint.state}</Card.Text>
                  <Card.Text>Pincode: {complaint.pincode}</Card.Text>
                  <Card.Text style={{ color: '#607D8B' }}>Comment: {complaint.comment}</Card.Text>
                  <Card.Text>
                    <strong>Status:</strong>{' '}
                    <span
                      style={{
                        color: complaint.status.toLowerCase() === 'pending' ? '#FF7043' : '#43A047',
                      }}
                    >
                      {complaint.status}
                    </span>
                  </Card.Text>
                  <Button
                    onClick={() => handleToggle(complaint._id)}
                    aria-controls={`collapse-${complaint._id}`}
                    aria-expanded={open}
                    style={{
                      background: open
                        ? 'linear-gradient(90deg, #00796B, #004D40)'
                        : 'linear-gradient(90deg, #43A047, #66BB6A)',
                      border: 'none',
                      marginTop: '10px',
                      transition: 'all 0.3s ease-in-out',
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.background = 'linear-gradient(90deg, #004D40, #00796B)')
                    }
                    onMouseOut={(e) =>
                      (e.target.style.background = open
                        ? 'linear-gradient(90deg, #00796B, #004D40)'
                        : 'linear-gradient(90deg, #43A047, #66BB6A)')
                    }
                  >
                    {open ? 'Hide Message' : 'Message'}
                  </Button>
                  <Collapse in={open} dimension="width">
                    <div id={`collapse-${complaint._id}`}>
                      <Card body style={{ width: '250px', marginTop: '12px', border: 'none' }}>
                        <ChatWindow
                          key={complaint.complaintId}
                          complaintId={complaint._id}
                          name={complaint.name}
                        />
                      </Card>
                    </div>
                  </Collapse>
                </Card.Body>
              </Card>
            );
          })
        ) : (
          <Alert
            variant="info"
            style={{
              width: '50%',
              margin: '50px auto',
              textAlign: 'center',
              background: '#E3F2FD',
              color: '#37474F',
              borderRadius: '8px',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Alert.Heading>No complaints to show</Alert.Heading>
          </Alert>
        )}
      </div>
    </>
  );
};

export default Status;










// import React, { useEffect, useState } from 'react'
// const Status = () => {
//   const [city, setCity] = useState('');
//   const [state, setState] = useState('');
//   const [complaint, setComplaint] = useState("")

//   // useEffect(()=>{
//   //   const id = localStorage.getItem("user")
//   //   console.log(id)

//   //     // axios.get(`http://localhost:8000/status${id}`)
//   //     // .then((res)=>{
//   //     //   const { city, state, complaint } = res.data;
//   //     //   console.log(city,state,complaint)
//   //     //   setState(state);
//   //     //   setCity(city);
//   //     //   setComplaint(complaint)
//   //     // })
//   //     // .catch((err)=>{
//   //     //   console.log(err)
//   //     // })
//   // },[])
//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('user'));
//     const { _id } = user;
//     console.log(_id);
//     axios.get(`http://localhost:8000/status/${_id}`)
//       .then((res) => {
//         axios.get('http://localhost:8000/Complaint')
//           .then((res) => {
//             const { city, state, complaint } = res.data;
//             console.log(city, state, complaint)
//             setState(state);
//             setCity(city);
//             setComplaint(complaint)
//           })
//           .catch((err) => {
//             console.log(err)
//           })
//       })
//       .catch((err) => {
//         console.log(err)
//       })
//   }, []);

//   return (
//     <>
//       <div className="row">
//         <div className="status col-sm-6 mb-sm-0">
//           <div className="card status-card">
//             <div className="card-body">
//               <h5 className="card-title">City:{city}</h5>
//               <p className="card-text">State:{state} </p>
//               <p className="card-text">Complaint:{complaint} </p>

//             </div>
//           </div>
//         </div>
//         <div className="status col-sm-6 mb-sm-0">
//           <div className="card status-card">
//             <div className="card-body">
//               <h5 className="card-title">h</h5>
//               <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. <br />In, voluptatibus!</p>

//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default Status
