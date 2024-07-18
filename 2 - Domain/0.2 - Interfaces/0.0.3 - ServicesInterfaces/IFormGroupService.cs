﻿using Microsoft.AspNetCore.Mvc;
using MovtechForms.Domain.Entities;

namespace MovtechForms._2___Domain._0._2___Interfaces._0._0._3___ServicesInterfaces
{
    public interface IFormGroupService
    {
        Task<FormsGroup> GetById(int id);
        Task<FormsGroup> Get();
        Task<FormsGroup> Post([FromBody] FormsGroup formGroup);
        Task<FormsGroup> Delete(int id);
        Task<FormsGroup> Update([FromBody] FormsGroup formsGroup, int id);
    }
}
