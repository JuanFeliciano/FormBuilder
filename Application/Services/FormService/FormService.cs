﻿using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;
using MovtechForms.Domain.Interfaces;
using System.Data;
using System.Data.SqlClient;

namespace MovtechForms.Application.Services.FormService
{
    public class FormService : IServices<Forms>
    {
        private readonly IDatabaseService _dbService;

        public FormService(IDatabaseService dbService) => _dbService = dbService;

        // GET METHOD
        public async Task<DataTable> Get()
        {
            string query = "SELECT * FROM Forms;";
            DataTable result = await _dbService.ExecuteQueryAsync(query, null!);

            return result;
        }

        // POST METHOD
        public async Task<DataTable> Post([FromBody] Forms form)
        {
            string query = "INSERT INTO Forms (Title, IdGroup) OUTPUT INSERTED.Id VALUES (@Title, @IdGroup);";

            if (string.IsNullOrWhiteSpace(form.Title))
            {
                throw new Exception("The value cannot be null or empty");
            }

            SqlParameter[] parameters =
            {
                new("@Title", form.Title.Trim()),
                new("@IdGroup", form.IdGroup)
            };

            DataTable result = await _dbService.ExecuteQueryAsync(query, parameters);

            return result;
        }

        // DELETE METHOD
        public async Task<DataTable> Delete(int id)
        {
            string deleteQuery = "DELETE FROM Forms WHERE Id = @Id;";
            string selectQuery = "SELECT * FROM Forms WHERE Id = @Id;";

            SqlParameter[] parameter = { new("Id", id) };
            SqlParameter[] Delparameter = { new("Id", id) };


            DataTable selectResult = await _dbService.ExecuteQueryAsync(selectQuery, parameter);
            DataTable deleteResult = await _dbService.ExecuteQueryAsync(deleteQuery, Delparameter);

            return selectResult;
        }

        // PUT METHOD
        public async Task<DataTable> Update([FromBody] Forms form, int id)
        {
            string query = "SELECT * FROM Forms;";
            DataTable result = await _dbService.ExecuteQueryAsync(query, null!);

            return result;
        }


    }
}
