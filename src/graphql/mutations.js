/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSavedMessages = /* GraphQL */ `
  mutation CreateSavedMessages(
    $input: CreateSavedMessagesInput!
    $condition: ModelSavedMessagesConditionInput
  ) {
    createSavedMessages(input: $input, condition: $condition) {
      id
      content
      senderName
      senderID
      userID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateSavedMessages = /* GraphQL */ `
  mutation UpdateSavedMessages(
    $input: UpdateSavedMessagesInput!
    $condition: ModelSavedMessagesConditionInput
  ) {
    updateSavedMessages(input: $input, condition: $condition) {
      id
      content
      senderName
      senderID
      userID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteSavedMessages = /* GraphQL */ `
  mutation DeleteSavedMessages(
    $input: DeleteSavedMessagesInput!
    $condition: ModelSavedMessagesConditionInput
  ) {
    deleteSavedMessages(input: $input, condition: $condition) {
      id
      content
      senderName
      senderID
      userID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createReaction = /* GraphQL */ `
  mutation CreateReaction(
    $input: CreateReactionInput!
    $condition: ModelReactionConditionInput
  ) {
    createReaction(input: $input, condition: $condition) {
      id
      userID
      content
      messageID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateReaction = /* GraphQL */ `
  mutation UpdateReaction(
    $input: UpdateReactionInput!
    $condition: ModelReactionConditionInput
  ) {
    updateReaction(input: $input, condition: $condition) {
      id
      userID
      content
      messageID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteReaction = /* GraphQL */ `
  mutation DeleteReaction(
    $input: DeleteReactionInput!
    $condition: ModelReactionConditionInput
  ) {
    deleteReaction(input: $input, condition: $condition) {
      id
      userID
      content
      messageID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createMessage = /* GraphQL */ `
  mutation CreateMessage(
    $input: CreateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    createMessage(input: $input, condition: $condition) {
      id
      content
      userID
      chatroomID
      image
      audio
      status
      replyToMessageID
      Reactions {
        nextToken
        startedAt
      }
      isSelected
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateMessage = /* GraphQL */ `
  mutation UpdateMessage(
    $input: UpdateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    updateMessage(input: $input, condition: $condition) {
      id
      content
      userID
      chatroomID
      image
      audio
      status
      replyToMessageID
      Reactions {
        nextToken
        startedAt
      }
      isSelected
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteMessage = /* GraphQL */ `
  mutation DeleteMessage(
    $input: DeleteMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    deleteMessage(input: $input, condition: $condition) {
      id
      content
      userID
      chatroomID
      image
      audio
      status
      replyToMessageID
      Reactions {
        nextToken
        startedAt
      }
      isSelected
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createChatRoom = /* GraphQL */ `
  mutation CreateChatRoom(
    $input: CreateChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    createChatRoom(input: $input, condition: $condition) {
      id
      newMessages
      LastMessage {
        id
        content
        userID
        chatroomID
        image
        audio
        status
        replyToMessageID
        isSelected
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      Messages {
        nextToken
        startedAt
      }
      ChatRoomUser {
        nextToken
        startedAt
      }
      Admin {
        id
        name
        imageUri
        status
        lastOnlineAt
        typingStatus
        followers
        following
        blockedUsers
        color
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      name
      imageUri
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      chatRoomLastMessageId
      chatRoomAdminId
    }
  }
`;
export const updateChatRoom = /* GraphQL */ `
  mutation UpdateChatRoom(
    $input: UpdateChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    updateChatRoom(input: $input, condition: $condition) {
      id
      newMessages
      LastMessage {
        id
        content
        userID
        chatroomID
        image
        audio
        status
        replyToMessageID
        isSelected
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      Messages {
        nextToken
        startedAt
      }
      ChatRoomUser {
        nextToken
        startedAt
      }
      Admin {
        id
        name
        imageUri
        status
        lastOnlineAt
        typingStatus
        followers
        following
        blockedUsers
        color
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      name
      imageUri
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      chatRoomLastMessageId
      chatRoomAdminId
    }
  }
`;
export const deleteChatRoom = /* GraphQL */ `
  mutation DeleteChatRoom(
    $input: DeleteChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    deleteChatRoom(input: $input, condition: $condition) {
      id
      newMessages
      LastMessage {
        id
        content
        userID
        chatroomID
        image
        audio
        status
        replyToMessageID
        isSelected
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      Messages {
        nextToken
        startedAt
      }
      ChatRoomUser {
        nextToken
        startedAt
      }
      Admin {
        id
        name
        imageUri
        status
        lastOnlineAt
        typingStatus
        followers
        following
        blockedUsers
        color
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      name
      imageUri
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      chatRoomLastMessageId
      chatRoomAdminId
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      name
      imageUri
      status
      lastOnlineAt
      typingStatus
      followers
      following
      blockedUsers
      Messages {
        nextToken
        startedAt
      }
      chatrooms {
        nextToken
        startedAt
      }
      color
      SavedMessages {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      name
      imageUri
      status
      lastOnlineAt
      typingStatus
      followers
      following
      blockedUsers
      Messages {
        nextToken
        startedAt
      }
      chatrooms {
        nextToken
        startedAt
      }
      color
      SavedMessages {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      name
      imageUri
      status
      lastOnlineAt
      typingStatus
      followers
      following
      blockedUsers
      Messages {
        nextToken
        startedAt
      }
      chatrooms {
        nextToken
        startedAt
      }
      color
      SavedMessages {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createChatRoomUser = /* GraphQL */ `
  mutation CreateChatRoomUser(
    $input: CreateChatRoomUserInput!
    $condition: ModelChatRoomUserConditionInput
  ) {
    createChatRoomUser(input: $input, condition: $condition) {
      id
      chatRoomID
      userID
      chatRoom {
        id
        newMessages
        name
        imageUri
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        chatRoomLastMessageId
        chatRoomAdminId
      }
      user {
        id
        name
        imageUri
        status
        lastOnlineAt
        typingStatus
        followers
        following
        blockedUsers
        color
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateChatRoomUser = /* GraphQL */ `
  mutation UpdateChatRoomUser(
    $input: UpdateChatRoomUserInput!
    $condition: ModelChatRoomUserConditionInput
  ) {
    updateChatRoomUser(input: $input, condition: $condition) {
      id
      chatRoomID
      userID
      chatRoom {
        id
        newMessages
        name
        imageUri
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        chatRoomLastMessageId
        chatRoomAdminId
      }
      user {
        id
        name
        imageUri
        status
        lastOnlineAt
        typingStatus
        followers
        following
        blockedUsers
        color
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteChatRoomUser = /* GraphQL */ `
  mutation DeleteChatRoomUser(
    $input: DeleteChatRoomUserInput!
    $condition: ModelChatRoomUserConditionInput
  ) {
    deleteChatRoomUser(input: $input, condition: $condition) {
      id
      chatRoomID
      userID
      chatRoom {
        id
        newMessages
        name
        imageUri
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        chatRoomLastMessageId
        chatRoomAdminId
      }
      user {
        id
        name
        imageUri
        status
        lastOnlineAt
        typingStatus
        followers
        following
        blockedUsers
        color
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
