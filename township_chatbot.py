import random

class TownshipChatbot:
    def __init__(self):
        self.greetings = ["Hello! How can I assist you today?",
                          "Hi there! What can I help you with?",
                          "Welcome! What do you need help with?"]
        self.goodbyes = ["Goodbye! Have a great day!",
                         "See you later!",
                         "Until next time!"]
        self.responses = {"greeting": self.greetings,
                          "goodbye": self.goodbyes}

    def get_response(self, user_input):
        if "hello" in user_input.lower():
            return random.choice(self.responses["greeting"])
        elif "bye" in user_input.lower():
            return random.choice(self.responses["goodbye"])
        else:
            return "I'm sorry, I didn't understand. Could you please rephrase that?"

if __name__ == "__main__":
    chatbot = TownshipChatbot()
    print("Welcome to Township Small Business Chatbot!")
    print("How can I assist you today?")

    while True:
        user_input = input("You: ")
        if user_input.lower() == 'exit':
            print("Goodbye!")
            break
        response = chatbot.get_response(user_input)
        print("Bot:", response)
