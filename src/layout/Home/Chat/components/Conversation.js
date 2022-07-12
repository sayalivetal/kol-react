import React from 'react'
import '../Chat.css'
const Conversation = () => {
  var dat = {
    data: {
      chat1: [
        {
          from: {
            type: 'user1',
          },
          msg: {
            message: 'Hello',
          },
        },
        {
          from: {
            type: 'user2',
          },
          msg: {
            message: 'Hi',
          },
        },
        {
          from: {
            type: 'user1',
          },
          msg: {
            message: 'What plans for today?',
          },
        },
        {
          from: {
            type: 'user2',
          },
          msg: {
            message: 'Nothing much. How about you?',
          },
        },
        {
          from: {
            type: 'user1',
          },
          msg: {
            message: 'Planning to go to a movie. Wanna come?',
          },
        },
        {
          from: {
            type: 'user2',
          },
          msg: {
            message: 'Sure why not.',
          },
        },
        {
          from: {
            type: 'user1',
          },
          msg: {
            message: 'Great. see you then.',
          },
        },
        {
          from: {
            type: 'user2',
          },
          msg: {
            message: 'ya bye.',
          },
        },
      ],

      chat2: [
        {
          from: {
            type: 'user1',
          },
          msg: {
            message: 'Hi',
          },
        },
        {
          from: {
            type: 'user2',
          },
          msg: {
            message: 'Hi',
          },
        },
        {
          from: {
            type: 'user1',
          },
          msg: {
            message: 'How can I help you?',
          },
        },
        {
          from: {
            type: 'user2',
          },
          msg: {
            message: 'I would like to know more about your product.',
          },
        },
        {
          from: {
            type: 'user1',
          },
          msg: {
            message:
              'Sure. I will send you an email with details on our product.',
          },
        },
        {
          from: {
            type: 'user1',
          },
          msg: {
            message: 'Let me know if you have any doubts.',
          },
        },
        {
          from: {
            type: 'user2',
          },
          msg: {
            message: 'Great. Thanks!',
          },
        },
        {
          from: {
            type: 'user1',
          },
          msg: {
            message: 'Anytime.',
          },
        },
      ],
    },
  };
  var chats = [];
  for (var chat in dat.data) {
    var str = '';
    dat.data[chat].forEach(
      (ch) =>
        (str +=
          '<div className="' + ch.from.type + '">' + ch.msg.message + '</div>')
    );
    chats.push(str);
  }
console.log(chats);
  return (
    <>
   
    <div className=''>Conversation</div>
    {/* <div>
      {chats}
    </div>
    {chats && chats.map((item,index)=>{
      return <div>{item}</div>
    })} */}
    </>
    
  )
}

export default Conversation