import os
import json
import argparse

# 포함할 파일 확장자 (tsx만 포함)
INCLUDE_CONTENT_EXTENSIONS = {'.tsx'}
# tsx 파일 내용을 포함할 디렉토리 (최상위 폴더 이름)
ALLOWED_DIRS = {"app", "components", "context", "utils"}

def build_tree_with_contents(root_dir):
    """
    주어진 루트 디렉토리의 트리 구조를 딕셔너리 형태로 생성합니다.
    지정된 폴더(app, components, context, utils) 내의 tsx 파일만 파일 내용을 포함하여 저장합니다.
    """
    tree = {}
    for dirpath, dirnames, filenames in os.walk(root_dir):
        rel_path = os.path.relpath(dirpath, root_dir)
        
        # 루트 디렉토리일 경우
        if rel_path == '.':
            current = tree
            # 루트 바로 하위 디렉토리는 허용된 디렉토리만 탐색
            dirnames[:] = [d for d in dirnames if d in ALLOWED_DIRS]
            allowed_included = False  # 루트 자체는 허용 대상이 아님
        else:
            path_parts = rel_path.split(os.sep)
            # 최상위 폴더가 허용된 디렉토리인지 확인 (하위 폴더는 자동 포함)
            allowed_included = path_parts[0] in ALLOWED_DIRS
            if not allowed_included:
                # 허용되지 않은 경로는 더 이상 탐색하지 않음
                dirnames[:] = []
                continue
            # 현재 디렉토리에 대한 트리 노드를 생성 혹은 탐색
            current = tree
            for part in path_parts:
                current = current.setdefault(part, {})

        # 허용된 경로라면 tsx 파일만 처리
        if allowed_included:
            current_files = {}
            for file in filenames:
                file_ext = os.path.splitext(file)[1].lower()
                if file_ext in INCLUDE_CONTENT_EXTENSIONS:
                    file_path = os.path.join(dirpath, file)
                    try:
                        with open(file_path, 'r', encoding='utf-8') as f:
                            content = f.read()
                        current_files[file] = content
                    except Exception as e:
                        current_files[file] = f"Error reading file: {e}"
            if current_files:
                current['__files__'] = current_files
    return tree

def save_json(data, output_file):
    """
    데이터를 JSON 파일로 저장합니다.
    """
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

def main(src_directory, output_file):
    if not os.path.isdir(src_directory):
        print(f"에러: '{src_directory}' 디렉토리가 존재하지 않습니다.")
        return

    tree = build_tree_with_contents(src_directory)
    save_json(tree, output_file)
    print(f"디렉토리 구조가 '{output_file}'에 저장되었습니다.")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Next.js src 디렉토리 구조를 JSON 파일로 저장합니다. 지정된 폴더(app, components, context, utils) 내의 tsx 파일의 경우 코드 내용을 포함합니다."
    )
    parser.add_argument(
        "--src",
        type=str,
        default="./",
        help="탐색할 src 디렉토리 경로 (기본값: ./)"
    )
    parser.add_argument(
        "--output",
        type=str,
        default="directory_structure.json",
        help="저장할 JSON 파일 이름 (기본값: directory_structure.json)"
    )

    args = parser.parse_args()
    main(args.src, args.output)
