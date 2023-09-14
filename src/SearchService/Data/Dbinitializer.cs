﻿using MongoDB.Driver;
using MongoDB.Entities;
using SearchService.Models;
using SearchService.Services;
using System.Text.Json;

namespace SearchService.Data
{
    public class Dbinitializer
    {
        public static async Task InitDb(WebApplication app)
        {
            await DB.InitAsync(
                "SearchDb",
                MongoClientSettings
             .FromConnectionString(app.Configuration.GetConnectionString("MongoDbConnection"))
         );

            await DB.Index<Item>()
                .Key(x => x.Make, KeyType.Text)
                .Key(x => x.Model, KeyType.Text)
                .Key(x => x.Color, KeyType.Text)
                .CreateAsync();


            var count = await DB.CountAsync<Item>();

            using var scope = app.Services.CreateScope();

            var httpClient = scope.ServiceProvider.GetRequiredService<AuctionServiceHttpClient>();


            var items = await httpClient.GetItemsForSearchDb();
            Console.WriteLine(items.Count + "Returned count from auctions service");

            if(items.Count > 0)
            {
                await DB.SaveAsync(items);
            }
        }
    }
}