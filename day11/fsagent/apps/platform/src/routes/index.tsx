import { createFileRoute } from '@tanstack/react-router'
import { initialMessagesFromMemory, useChat } from '@anvia/react'
import { ChatProvider, Thread, Composer, Message } from '@anvia/react-ui'

export const Route = createFileRoute('/')({ component: Home, loader: async () => {
  const response = await fetch('http://localhost:8000/api/chat')
  const messages = await response.json()
  return messages
} })

function Home() {
  const messages = Route.useLoaderData()
  console.log(messages)
  
  const chat = useChat({
    endpoint: 'http://localhost:8000/api/chat',
    initialMessages: initialMessagesFromMemory(messages),
  })
  return (
    <ChatProvider controller={chat}>
      <Thread.Root className="chat">
        <Thread.Viewport className="chat-scroll" autoScroll>
          <Thread.Empty className="empty-state">
            Ask your first question.
          </Thread.Empty>
          <Thread.Suggestions className="suggestions" />
          <Thread.Messages className="messages">
                {() => (
                  <Message.Root className="message">
                    <Message.Content className="message-content">
                      <Message.Parts>
                              {(part) => {
                                if (part.type === "text") {
                                  return (
                                    <Message.Part className="text-part">
                                      <Message.Markdown />
                                    </Message.Part>
                                  );
                                }
                      
                                if (part.type === "attachment") {
                                  return (
                                    <Message.Part className="attachment-part">
                                      <Message.Attachment className="attachment-card" />
                                    </Message.Part>
                                  );
                                }
                      
                                if (part.type === "tool") {
                                  return (
                                    <Message.Part className="tool-part">
                                      <Message.Tool className="tool-card" renderWhen="always" />
                                    </Message.Part>
                                  );
                                }
                      
                                return <Message.Part className="message-part" />;
                              }}
                            </Message.Parts>
                    </Message.Content>
                  </Message.Root>
                )}
              </Thread.Messages>
          <Thread.Error className="thread-error" />
          <Thread.ViewportFooter>
            <Thread.ScrollToBottom className="scroll-button">
              Latest
            </Thread.ScrollToBottom>
          </Thread.ViewportFooter>
        </Thread.Viewport>
      </Thread.Root>
      <Composer.Root className="composer">
        <Composer.Input
          minRows={1}
          maxRows={6}
          placeholder="Message Anvia..."
        />
        { chat.status === 'streaming' ? (<Composer.Stop>Stop</Composer.Stop>) : (<Composer.Submit>Send</Composer.Submit>) }        
      </Composer.Root>
    </ChatProvider>
  )
}
