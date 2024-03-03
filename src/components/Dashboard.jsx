import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DomainForm from './DomainForm';
import DomainTable from './DomainTable';
import FileUpload from './FileUpload';
import Chart from './Chart';
import { baseURL } from './baseurl';


function Dashboard({token}) {
    // const [token,settoken]=useState(localStorage.getItem("token"))
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [domains, setDomains] = useState([]);
    const [filteredDomains, setFilteredDomains] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchDomains();
    }, []);
    
    const headers = {
        'Authorization': `Bearer ${token}`
    };
    const fetchDomains = async () => {
        try {
            const response = await axios.get(`${baseURL}/api/domains`, { headers });
            setDomains(response.data);
            setFilteredDomains(response.data);
        } catch (error) {
            console.error('Error fetching domains:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${baseURL}/api/domains/${id}`, { headers });
            alert('Domain deleted successfully!');
            setDomains(domains.filter(domain => domain._id !== id));
            setFilteredDomains(filteredDomains.filter(domain => domain._id !== id));
            fetchdata()
        } catch (error) {
            console.error('Error deleting domain:', error);
        }
    };

    const handleFilter = (filter) => {
        const filtered = domains.filter(domain =>
            domain.name.toLowerCase().includes(filter.toLowerCase())
        );
        setFilteredDomains(filtered);
    };

    const fetchdata = () => {
        axios.get(`${baseURL}/api/stats`, { headers })
            .then(response => {
                const { domainTypes } = response.data;
                const chartData = Object.keys(domainTypes).map(key => ({
                    name: key,
                    value: domainTypes[key]
                }));
                setData(chartData);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }

    useEffect(() => {
        fetchdata()
    }, []);

    return (
        <>{
            !token ? <h2>Login First...</h2> :
                <div style={{ height: "auto", width: "90%", border: "1px solid white", margin: "auto", textAlign: "center" }}>
                    <h1 style={{ color: "teal" }}>Domain Dashboard</h1>
                    <DomainForm onDomainAdded={fetchDomains} fetchdata={fetchdata} />
                    <br />
                    <FileUpload onUploadSuccess={fetchDomains} fetchDomains={fetchDomains} fetchdata={fetchdata} domains={filteredDomains} />
                    <DomainTable
                        domains={filteredDomains}
                        onDelete={handleDelete}
                        onFilter={handleFilter}
                        fetchDomains={fetchDomains} fetchdata={fetchdata}
                    />
                    <br />
                    <Chart data={data} loading={loading} error={error} />

                </div>
        }

        </>
    );
}

export default Dashboard;
