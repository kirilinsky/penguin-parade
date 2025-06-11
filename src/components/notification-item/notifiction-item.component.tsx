import React, { useEffect, useState } from "react";
import {
  NotificationAccordionBody,
  NotificationAccordionContainer,
  NotificationAccordionHeader,
  NotificationTimestamp,
  NotificationTitleRow,
  NotificationTypeSpan,
  NotificationUnreadDot,
} from "./notification-item.component";
import { UserNotification } from "@/types/notification.types";
import { format } from "date-fns";
import { getLocalized } from "@/helpers/get-localized/get-localized";
import { useLocale, useTranslations } from "next-intl";
import { LinkStyled } from "../link/link.component.styled";
import { getNotificationLink } from "@/helpers/get-notification-link-payload/get-notification-link-payload";

const NotifictionItem = ({
  notification,
  onRead,
}: {
  notification: UserNotification;
  onRead: (notificationId: string) => void;
}) => {
  const locale = useLocale();
  const t = useTranslations("notificationItem");
  const [open, setOpen] = useState(false);
  const [read, setRead] = useState(false);
  const toggle = (notification: UserNotification) => {
    if (!open && !notification.read) {
      onRead(notification.id);
      setRead(true);
    }
    setOpen(!open);
  };

  useEffect(() => {
    setRead(notification.read);
  }, []);

  const link = getNotificationLink(notification.payload);

  return (
    <NotificationAccordionContainer>
      <NotificationAccordionHeader
        onClick={() => toggle(notification)}
        $unread={!notification.read && !read}
      >
        <NotificationTitleRow>
          <NotificationTypeSpan>{t(notification.type)}</NotificationTypeSpan>
          {!notification.read && !read && <NotificationUnreadDot />}
        </NotificationTitleRow>
        <NotificationTimestamp>
          {format(notification.createdAt.toDate(), "dd.MM.yy HH:mm")}
        </NotificationTimestamp>
      </NotificationAccordionHeader>
      {open && notification.message && (
        <NotificationAccordionBody>
          <p>{getLocalized(notification.message, locale)}</p>
          {notification.payload && link && (
            <LinkStyled href={link}>{t("linkAction")}</LinkStyled>
          )}
        </NotificationAccordionBody>
      )}
    </NotificationAccordionContainer>
  );
};

export default NotifictionItem;
