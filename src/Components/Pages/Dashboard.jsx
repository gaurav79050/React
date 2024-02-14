import React, { useState, useEffect } from "react";
import CountCard from "../Taskmgmt/Countcard";
import "./dashboard.css";
import Section from "../Layouts/Section";
import { getTaskCount } from "../Api";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const [count, setCount] = useState({ total: 0, pending: 0 });
  const { username } = useSelector((state) => state.auth);
  

  useEffect(() => {
    const fetchTask_count = async () => {
      try {
        const { total, pending } = await getTaskCount(username);
        setCount({ total, pending });
      } catch (error) {
        console.error("Error fetching task count:", error);
      }
    };
    fetchTask_count();
  }, []);


  return (
    <Section pageTitle="Dashboard">
      <div className="dashboard-container">
        <CountCard title="Total" count={count.total} />
        <CountCard title="Pending" count={count.pending} />
      </div>
    </Section>
  );
};

export default Dashboard;
