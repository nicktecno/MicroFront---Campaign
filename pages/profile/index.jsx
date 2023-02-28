import dynamic from "next/dynamic";
import { useContext } from "react";
import { Context } from "../../Context/AuthContext";
import { useCart } from "../../Context/CartLengthContext";
import { useLang } from "../../Context/LangContext";
import api from "../../services/api";

const ProfileMicro = dynamic(() => import("profilePage/profile"), {
  ssr: false,
});

export default function Profile() {
  const { routeTranslations } = useLang();
  const { handleLogout } = useContext(Context);
  const { setCartLength } = useCart();

  const mktName = process.env.NEXT_PUBLIC_REACT_APP_NAME;
  return (
    <>
      <ProfileMicro
        mktName={mktName}
        api={api}
        routeTranslations={routeTranslations}
        setCartLength={setCartLength}
        handleLogout={handleLogout}
      />
    </>
  );
}
