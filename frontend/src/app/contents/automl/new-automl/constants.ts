export class Constants {
    static url_upload_file = "xd";
    static url_get_modelers = "http://localhost:8080/get_models";
    static url_get_preprocessors = "http://localhost:8080/get_preprocessors";
    static url_get_metrics = "http://localhost:8080/get_metrics";
    static url_get_controllers = "http://localhost:8080/get_controllers";
    static url_add_new_automl = "http://localhost:8080/add_automl_request";
    static url_get_all_automls = "http://localhost:8080/get_all_automls";

    static url_get_automl_result(automlrequest_id:number){
        return "http://localhost:8080/get_automl_result?automlrequest_id=" + automlrequest_id;
    }
}
