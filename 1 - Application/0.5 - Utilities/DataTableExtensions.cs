using System.Data;
using System.Reflection;

namespace MovtechForms.Application
{
    public static  class DataTableExtensions
    {

        public static List<T> ConvertDataTableToList<T>(this DataTable table) where T : new()
        {
            List<T> result = [];

            foreach (DataRow row in table.Rows)
            {
                T item = new();
                foreach (DataColumn column in table.Columns)
                {
                    PropertyInfo prop = item.GetType().GetProperty(column.ColumnName)!;
                    if (prop != null && row[column] != DBNull.Value)
                    {
                        prop.SetValue(item, row[column]);
                    }
                }

                result.Add(item);
            }

            return result;
        }

    }
}
