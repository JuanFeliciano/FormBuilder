using System.Data;

namespace MovtechForms.Application
{
    public static class ConvertFormat
    {
        public static string ConvertDataTableToJson(DataTable dataTable)
        {
            if (dataTable is null)
            {
                return string.Empty;
            }

            return Newtonsoft.Json.JsonConvert.SerializeObject(dataTable, Newtonsoft.Json.Formatting.Indented);
        }

        public static string ConvertICollectionToJson<T>(ICollection<T> collection)
        {
            if (collection is null)
            {
                return string.Empty;
            }

            return Newtonsoft.Json.JsonConvert.SerializeObject(collection, Newtonsoft.Json.Formatting.Indented);
        }
    }
}
