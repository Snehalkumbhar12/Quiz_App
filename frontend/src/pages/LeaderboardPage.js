import React, { useEffect, useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import axios from 'axios';

const LeaderboardPage = () => {
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token'); // Retrieve token from local storage

    useEffect(() => {
        const fetchLeaderboardData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/leaderboard', {
                    headers: {
                        Authorization: `Bearer ${token}` // Include the token in the headers
                    }
                });
                setLeaderboardData(response.data); // Data will now include user names
            } catch (error) {
                setError('Failed to fetch leaderboard data.');
            } finally {
                setLoading(false);
            }
        };
        fetchLeaderboardData();
    }, [token]); // Adding token as a dependency

    if (loading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="text-center text-danger">{error}</div>;

    return (
        <MDBContainer>
            <h2 className="text-center my-4">Leaderboard</h2>
            <MDBTable striped bordered hover>
                <MDBTableHead dark>
                    <tr>
                        <th>#</th>
                        <th>User</th>
                        <th>Score</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {leaderboardData.length > 0 ? (
                        leaderboardData.map((user, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{user.name || token}</td>  {/* User's name should appear here */}
                                <td>{user.score}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="text-center">No data available</td>
                        </tr>
                    )}
                </MDBTableBody>
            </MDBTable>
        </MDBContainer>
    );
};

export default LeaderboardPage;
