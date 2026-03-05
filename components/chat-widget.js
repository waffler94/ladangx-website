"use client";

import { createChat } from "@n8n/chat";
import { useEffect } from "react";
export default function ChatWidget() {
    useEffect(() => {

        createChat({
            webhookUrl:
                "https://ai.viralgen.app/webhook/231e7f75-1c87-47fb-b9e0-c179fa89614e/chat",
            mode: "fullscreen",
            showWelcomeScreen: false,
            target: "#chat-widget-container",
            loadPreviousSession: true,
            initialMessages: ["Hi there! 👋", "How can I assist you today?"],
            i18n: {
                en: {
                    title: "",
                    subtitle: "",
                    footer: "",
                    getStarted: "New Conversation",
                    inputPlaceholder: "Type your question...",
                },
            },
        }
        );
    }, []);

    return (
        <>
            <div id="chat-widget-container" />

            <style>{`
      :root {
        --chat--color--primary: #446A2A;
        --chat--color--primary-shade-50: #688F44;
        --chat--color--primary--shade-100: #395327;
        --chat--color--secondary: #446A2A;
        --chat--color-secondary-shade-50: #395327;
        --chat--header--background: #446A2A;
        --chat--header--color: #ffffff;
        --chat--message--user--background: #446A2A;
        --chat--message--user--color: #ffffff;
        --chat--toggle--background: #446A2A;
        --chat--toggle--hover--background: #395327;
        --chat--toggle--active--background: #2e4120;
        --chat--input--send--button--color: #446A2A;
        --chat--input--send--button--color-hover: #395327;
        --chat--input--file--button--color: #446A2A;
        --chat--input--file--button--color-hover: #395327;
        --chat--button--background--primary: #446A2A;
        --chat--button--background--primary--hover: #395327;

        /* Reduce title/subtitle spacing */
        --chat--subtitle--line-height: 0.8;
        --chat--subtitle--font-size: 0.85em;

        /* Reduce chat bubble vertical spacing */
        --chat--message--padding: calc(var(--chat--spacing) * 0.4);

        /* Center-align input area with send button */
        --chat--textarea--height: 40px;
        --chat--input--padding: 0.5rem 0.8rem;
        --chat--input--line-height: 1.5;
      }

     

      .chat-input {
        align-items: center !important;
      }

      .chat-inputs {
                align-items: center !important;
                padding: 0 20px !important
      }

      .chat-messages-list {
                min-height: calc(100vh - 200px) !important;
                padding: 20px;
      }

      .chat-layout .chat-header {
      
      display:none !important;
      }
    `}</style>
        </>

    );
}
