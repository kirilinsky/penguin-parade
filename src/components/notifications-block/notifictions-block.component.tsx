import { useGetNotifications } from "@/hooks/use-get-notifications";
import React, { useState } from "react";
import { PageContentBlockStyled } from "../page-content-block/page-content-block.component.styled";
import {
  NotificationAccordionBody,
  NotificationAccordionContainer,
  NotificationAccordionHeader,
  NotificationTimestamp,
  NotificationTitleRow,
  NotificationTypeSpan,
  NotificationUnreadDot,
} from "./notifications-block.component";
import { UserNotification } from "@/types/notification.types";

const NotifictionsBlock = () => {
  const { notifications, hasUnread, loading } = useGetNotifications();
  const [open, setOpen] = useState(false);
  const toggle = (notification: UserNotification) => {
    setOpen(!open);
  };

  console.log(notifications, "notifications");

  return (
    <PageContentBlockStyled>
      <h2>Notifications</h2>

      {loading
        ? "loading"
        : notifications.map((notification) => (
            <NotificationAccordionContainer key={notification.id}>
              <NotificationAccordionHeader
                onClick={() => toggle(notification)}
                $unread={!notification.read}
              >
                <NotificationTitleRow>
                  <NotificationTypeSpan>
                    {notification.type}
                  </NotificationTypeSpan>
                  {!notification.read && <NotificationUnreadDot />}
                </NotificationTitleRow>
                <NotificationTimestamp>
                  {new Date(notification.createdAt).toLocaleString()}
                </NotificationTimestamp>
              </NotificationAccordionHeader>
              {open && notification.message && (
                <NotificationAccordionBody>
                  <p>{notification.message.ru}</p>
                </NotificationAccordionBody>
              )}
            </NotificationAccordionContainer>
          ))}
    </PageContentBlockStyled>
  );
};

export default NotifictionsBlock;
