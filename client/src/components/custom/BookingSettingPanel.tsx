import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { useAuthContext } from "../../providers/AuthProvider";
import PhotoUpdates from "./PhotoUpdates";
import PhotographerUploadCompletedPhoto from "./PhotographerUploadCompletedPhoto";
import UpdateBookingStatus from "./UpdateBookingStatus";
interface BookingSettingPanelProps {
  booking: BookingType;
}
const BookingSettingPanel: React.FC<BookingSettingPanelProps> = ({
  booking,
}) => {
  return (
    <div className=" p-4 bg-light_blue space-y-6">
      <h1 className=" text-xl md:text-2xl text-cream font-medium underline underline-offset-2 ">
        Settings
      </h1>
      {(booking.status !== "rejected" && booking.status !== "closed") && <TabsDemo booking={booking} />}
    </div>
  );
};

export default BookingSettingPanel;

interface TabsDemoProps {
  booking: BookingType;
}

import React from "react";

const TabsDemo: React.FC<TabsDemoProps> = ({ booking }) => {
  const { user } = useAuthContext();
  const tabOptions = [
    {
      value: "booking-status",
      label: "Update booking status",
      component: <UpdateBookingStatus booking={booking} />,
    },
    {
      value: "photo-update",
      label: "Photo updates",
      component: <PhotoUpdates booking={booking} />,
    },
    {
      value: "upload-photo",
      label:
        user?.role === "client" ? "Finished photos" : "Upload finished photos",
      component: <PhotographerUploadCompletedPhoto booking={booking} />,
    },
  ];
  return (
    <Tabs
      defaultValue="booking-status"
      orientation="vertical"
      className="w-full bg-light min-h-[600px]"
    >
      <TabsList className="grid w-full grid-cols-3   h-fit bg-dark_blue rounded-none">
        {tabOptions.map((tab, i) => {
          if (tab.value === "upload-photo") {
            return (
              <TabsTrigger
                value={tab.value}
                key={i}
                className="text-base text-light  data-[state=active]:bg-light_red data-[state=active]:text-cream"
                disabled={booking.status === "pending"}
              >
                {tab.label}
              </TabsTrigger>
            );
          }
          if (tab.value === "photo-update") {
            return (
              <TabsTrigger
                value={tab.value}
                key={i}
                className="text-base text-light  data-[state=active]:bg-light_red data-[state=active]:text-cream"
                disabled={booking.status === "pending"}
              >
                {tab.label}
              </TabsTrigger>
            );
          }
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
        <TabsContent value={tab.value} className="p-4" key={i}>
          {tab.component}
        </TabsContent>
      ))}
    </Tabs>
  );
};
