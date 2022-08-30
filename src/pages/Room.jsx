import React, { useContext, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Guest, Host } from "../components";
import { Context } from "../context/AppContext";

export default function Room() {
  const { createRoom, setRoom, setHost } = useContext(Context);
  const location = useLocation();
  const params = useParams();
  const state = location.state;
  useEffect(() => {
    if (state?.host) {
      createRoom(params.id);
      setHost(true);
    }
    setRoom(params.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);
  if (state?.host) {
    return <Host />;
  }
  return <Guest />;
}
