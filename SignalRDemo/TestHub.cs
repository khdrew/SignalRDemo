using Microsoft.AspNet.SignalR;
using System;
using System.IO;

namespace SignalRDemo
{
    public class TestHub: Hub
    {
        public void StartUpMethod(string name)
        {
            Clients.All.AnnounceStartUp(name);
        }

        public void SendChat(string sender, string chat)
        {
            Clients.All.ReceiveChat(sender, chat);
        }
    }
}