using Microsoft.AspNet.SignalR;
using Newtonsoft.Json;
using System;
using System.Collections.Concurrent;

namespace ChatGroupApp
{
    public static class DataStore {
        private static ConcurrentQueue<string> groups = new ConcurrentQueue<string>();
        private static ConcurrentQueue<Tuple<string, string>> list = new ConcurrentQueue<Tuple<string, string>>();
        public static void AddGroup(string name)
        {
            groups.Enqueue(name);
        }
        public static string GetGroups()
        {
            return JsonConvert.SerializeObject(groups);
        }
        public static void AddText(string name, string message) {
            list.Enqueue(Tuple.Create<string, string>(name, message));
        }
        public static string GetText() {
            return JsonConvert.SerializeObject(list);
        }
}
    public class ChatGroupHub : Hub
    {     
        public void SendMessage(string name, string message)
        {
            DataStore.AddText(name, message);
            Clients.All.broadcastMessage(name, message);
        }
        public void AddGroup(string name)
        {
            DataStore.AddGroup(name);
            Clients.All.addGroup(name);
        }
        public void GetAllGroups()
        {
            Clients.All.getAllGroups(DataStore.GetGroups());
        }
        public void GetAllMessage()
        {   
            Clients.All.getAllMessage(DataStore.GetText());
        }
    }
}