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
    }
}