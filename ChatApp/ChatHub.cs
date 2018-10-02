using Microsoft.AspNet.SignalR;
using Newtonsoft.Json;
using System;
using System.Collections.Concurrent;

namespace ChatApp
{
    public static class DataStore { 
        private static ConcurrentQueue<Tuple<string, string>> list = new ConcurrentQueue<Tuple<string, string>>();
        public static void AddText(string name, string message) {
            list.Enqueue(Tuple.Create<string, string>(name, message));
        }
        public static string GetText() {
            return JsonConvert.SerializeObject(list);
        }
}
    public class ChatHub : Hub
    {     
        public void SendMessage(string name, string message)
        {
            DataStore.AddText(name, message);
            Clients.All.broadcastMessage(name, message);
        }
        public void GetAllMessage()
        {   
            Clients.All.getAllMessage(DataStore.GetText());
        }
    }
}