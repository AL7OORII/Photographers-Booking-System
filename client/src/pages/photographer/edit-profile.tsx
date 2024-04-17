import UpdatePhotographerDetailsForm from "../../components/custom/UpdatePhotographerDetailsForm";
import UpdatePhotographerPassword from "../../components/custom/UpdatePhotographerPassword";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";

const EditProfilePage = () => {
  const tabOptions = [
    {
      value: "update-profile",
      label: "Update profile",
      component: <UpdatePhotographerDetailsForm />,
    },
    {
      value: "update-password",
      label: "Update password",
      component: <UpdatePhotographerPassword />,
    },
  ];

  return (
    <>
      <Tabs
        defaultValue="update-profile"
        orientation="vertical"
        className="w-full bg-light min-h-[600px] p-4"
      >
        <h1 className="text-2xl text-dark_blue md:text-4xl mb-4 font-semibold underline underline-offset-2">
          Edit Profile
        </h1>
        <TabsList className="grid w-full grid-cols-2   h-fit bg-dark_blue rounded-none">
          {tabOptions.map((tab, i) => {
            return (
              <TabsTrigger
                value={tab.value}
                key={i}
                className="text-base text-light  data-[state=active]:bg-light_red data-[state=active]:text-cream"
              >
                {tab.label}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {tabOptions.map((tab, i) => (
          <TabsContent value={tab.value} className="" key={i}>
            {tab.component}
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
};

export default EditProfilePage;
