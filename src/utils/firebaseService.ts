import { database } from '../config/firebase';
import { ref, push, set, get, update, onValue } from 'firebase/database';
import { MessageData } from '../types';

// 🔥 Firebase Database 경로
const MESSAGES_PATH = 'messages';
const PUBLIC_MESSAGE_PATH = 'publicMessage';

/**
 * 공개 메시지(라이너 노트) 가져오기
 */
export const getPublicMessage = async () => {
  const publicRef = ref(database, PUBLIC_MESSAGE_PATH);
  const snapshot = await get(publicRef);
  
  if (snapshot.exists()) {
    return snapshot.val();
  }
  
  // 기본값 반환
  return {
    from: "Nayeon",
    title: "To. My Dear Visitor",
    content: `안녕하세요.

평소 연말연시에 큰 의미를 두지는 않는 편입니다만,
올해만큼은 이 시간을 정성껏 매듭짓고 싶다는 마음이 들었습니다.
무심하게 흘러가는 삶 속에서도,
소중한 순간들을 오래도록 붙잡아두고 싶어 이렇게 편지를 적습니다.

지난 한 해, 어떤 기억이 가장 마음에 남으셨나요?
저는 외로움을 마주하고 다시 일어서는 시간을 보냈습니다.
그 과정에서 작은 기쁨들이 모여 우리를 살게 하고, 
결국 행복이 된다는 걸 깨달았다고 할 수 있겠네요.

‘이것만 지나면 괜찮아질 거야’라며 미래를 서성거리기보다,
지금 제 앞에 놓인 이 계절을 온전히 사랑하는 사람이 되고 싶습니다.

앞으로도 우리의 즐거운 순간들이 서로에게 닿기를 소망합니다.

제 아끼는 마음이 온전히 전해지기를 바랍니다.`,
  };
};

/**
 * 공개 메시지 업데이트
 */
export const updatePublicMessage = async (message: { from: string; title: string; content: string }) => {
  const publicRef = ref(database, PUBLIC_MESSAGE_PATH);
  await set(publicRef, message);
};

/**
 * 모든 메시지 가져오기 (실시간 리스너)
 */
export const subscribeToMessages = (callback: (messages: MessageData[]) => void) => {
  const messagesRef = ref(database, MESSAGES_PATH);
  
  return onValue(messagesRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const messagesArray = Object.entries(data).map(([key, value]: [string, any]) => ({
        ...value,
        firebaseId: key, // Firebase 고유 ID 추가
      }));
      callback(messagesArray);
    } else {
      callback([]);
    }
  });
};

/**
 * 특정 수신자와 비밀번호로 메시지 찾기
 */
export const findMessage = async (receiver: string, password: string): Promise<MessageData | null> => {
  const messagesRef = ref(database, MESSAGES_PATH);
  const snapshot = await get(messagesRef);
  
  if (snapshot.exists()) {
    const messages = snapshot.val();
    const foundEntry = Object.entries(messages).find(([_, msg]: [string, any]) => 
      msg.receiver === receiver && msg.password === password
    );
    
    if (foundEntry) {
      const [firebaseId, messageData] = foundEntry;
      return { ...messageData as MessageData, firebaseId };
    }
  }
  
  return null;
};

/**
 * 새 메시지 추가
 */
export const addMessage = async (message: Omit<MessageData, 'id' | 'firebaseId'>) => {
  const messagesRef = ref(database, MESSAGES_PATH);
  const newMessageRef = push(messagesRef);
  
  const messageData = {
    ...message,
    id: newMessageRef.key, // Firebase가 생성한 고유 ID
    createdAt: Date.now(),
    isRead: false,
    hasReply: false,
  };
  
  await set(newMessageRef, messageData);
  return messageData;
};

/**
 * 메시지에 답장 추가
 */
export const addReply = async (messageId: string, replyContent: string) => {
  const messageRef = ref(database, `${MESSAGES_PATH}/${messageId}`);
  
  await update(messageRef, {
    reply: replyContent,
    repliedAt: Date.now(),
    hasReply: true,
  });
};

/**
 * 메시지 읽음 상태 업데이트
 */
export const markAsRead = async (messageId: string) => {
  const messageRef = ref(database, `${MESSAGES_PATH}/${messageId}`);
  
  await update(messageRef, {
    isRead: true,
    readAt: Date.now(),
  });
};

/**
 * 특정 doorId의 메시지 읽음 상태 확인
 */
export const checkDoorStatus = async (doorId: number): Promise<'empty' | 'unread' | 'read' | 'replied'> => {
  const messagesRef = ref(database, MESSAGES_PATH);
  const snapshot = await get(messagesRef);
  
  if (snapshot.exists()) {
    const messages = snapshot.val();
    const message = Object.values(messages).find((msg: any) => msg.doorId === doorId);
    
    if (message) {
      const msg = message as any;
      if (msg.hasReply) return 'replied';
      if (msg.isRead) return 'read';
      return 'unread';
    }
  }
  
  return 'empty';
};

/**
 * 초기 샘플 데이터 업로드 (처음 한 번만 실행)
 */
export const uploadSampleData = async () => {
  const sampleMessages = [
    {
      receiver: '게스트',
      password: '1234',
      doorId: 1,
      from: '주인장',
      themeColor: '#FF6B6B',
      content: `안녕하세요, 방문자님!
    
눈 내리는 숲속 우체국에 오신 것을 환영합니다.
이곳은 마음을 전하는 따뜻한 픽셀 공간이에요.

올 한 해, 당신의 겨울이
유난히 따뜻했기를 바랍니다.

메리 크리스마스!`
    },
    {
      receiver: '친구1',
      password: '0000',
      doorId: 7,
      from: '베프',
      content: `야! 올해도 고생 많았다.
내년에는 우리 더 자주 보자.
항상 응원할게!`
    }
  ];

  try {
    for (const msg of sampleMessages) {
      await addMessage(msg);
    }
  } catch (error) {
    throw error;
  }
};

// 개발 모드에서 브라우저 콘솔 접근 허용
if (import.meta.env.DEV) {
  (window as any).uploadSampleData = uploadSampleData;
  (window as any).getPublicMessage = getPublicMessage;
  (window as any).findMessage = findMessage;
  (window as any).addMessage = addMessage;
  (window as any).addReply = addReply;
  (window as any).markAsRead = markAsRead;
}
