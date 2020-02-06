import json


def user_info_to_json_db():
    with open("users.json", "r") as read_file:
        data = json.load(read_file)

    data_json = []
    for d in data:
        data_json.append({
            "model": "user_info.user",
            "pk": d['id'],
            "fields": {
                "first_name": d['first_name'],
                "last_name": d['last_name'],
                "email": d['email'],
                "gender": d['gender'],
                "ip_address": d['ip_address']
            }
        })

    with open("users_statistic.json", "r") as read_file:
        data = json.load(read_file)

    for i, d in enumerate(data, start=1):
        data_json.append({
            "model": "user_info.statistic",
            "pk": i,
            "fields": {
                "user_id": d['user_id'],
                "date": d['date'],
                "page_views": d['page_views'],
                "clicks": d['clicks']
            }
        })

    with open('../../user_info_db.json', 'w') as outfile:
        json.dump(data_json, outfile)


user_info_to_json_db()

