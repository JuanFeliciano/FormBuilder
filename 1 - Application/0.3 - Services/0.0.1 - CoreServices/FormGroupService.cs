using Microsoft.AspNetCore.Mvc;
using MovtechForms._2___Domain._0._2___Interfaces._0._0._2___HandlerInterfaces;
using MovtechForms._2___Domain._0._2___Interfaces._0._0._3___ServicesInterfaces;
using MovtechForms.Domain.Entities;

namespace MovtechForms.Application.Services.MainServices
{
    public class FormGroupService : IFormGroupService
    {
        private readonly IFormGroupHandler _formGroupHandler;

        public FormGroupService(IFormGroupHandler formGroupHandler) => _formGroupHandler = formGroupHandler;


        public async Task<FormsGroup> Get()
        {
            return await _formGroupHandler.Get();
        }

            // GET METHOD
            public async Task<FormsGroup> GetById(int id)
        {
            return await _formGroupHandler.GetById(id);
        }

        // POST METHOD
        public async Task<FormsGroup> Post([FromBody] FormsGroup formsGroup)
        {
            return await _formGroupHandler.Post(formsGroup);
        }

        // DELETE METHOD

        public async Task<FormsGroup> Delete(int id)
        {
            return await _formGroupHandler.Delete(id);
        }

        // UPDATE METHOD

        public async Task<FormsGroup> Update([FromBody] FormsGroup formGroup, int id)
        {
            return await _formGroupHandler.Update(formGroup, id);
        }
    }
}
