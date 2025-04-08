import { FieldDisplayTypes, onFieldReact } from "@formily/core";
import { action } from "@formily/reactive";

export const useAsyncDataSource = (
  id: string,
  service: (field: FieldDisplayTypes, id: string) => Promise<{ label: string; value: any }[]>
) => {
  onFieldReact(id, (field: any) => {
    field.loading = true
    service(field, id).then(
      action.bound((data) => {
        field.dataSource = data
        field.loading = false
      })
    )
  })
}
