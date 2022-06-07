import { BasicPage } from "../../components/BasicPage";
import Person from "@mui/icons-material/Person";
import Settings from "@mui/icons-material/Settings";


export const ProfilePage = () => {
    return <BasicPage title="Profile Page" icon={<Person />} />;
};


export const SettingsPage = () => {
    return <BasicPage title="Settings Page" icon={<Settings />} />;
};
