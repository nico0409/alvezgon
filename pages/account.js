import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import BasicLayout from "../layouts/BasicLayout";
import useAuth from "../hooks/useAuth";
import { getMeApi } from "../api/user";
import ChangeNameForm from "../components/Account/ChangeNameForm";

const account = () => {
  const [user, setUser] = useState(undefined);
  const { logout, auth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const response = await getMeApi(logout);
      setUser(response || null);
    })();
  }, [auth]);

  if (user === undefined) return null;
  if (user === null) {
    router.push("/");
    return null;
  }

  return (
    <BasicLayout className="account">
      <Configuration user={user} />
    </BasicLayout>
  );
};

const Configuration = (props) => {
  const { user } = props;
  return (
    <div className="account__configuration">
      <div className="title">Configuracion</div>
      <div className="data">
        <ChangeNameForm user={user} />
      </div>
    </div>
  );
};

export default account;
