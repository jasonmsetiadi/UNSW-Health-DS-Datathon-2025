"""
Convert CSV data to JSON format for the dashboard.
This script processes the hip fracture data and creates a JSON file
that can be loaded by the HTML dashboard.
"""
import csv
import json
from pathlib import Path
from typing import Dict, List, Any


def load_csv_data(csv_path: str) -> List[Dict[str, Any]]:
    """
    Load and parse the CSV data file.
    
    Args:
        csv_path: Path to the CSV file
        
    Returns:
        List of dictionaries containing the data
    """
    data: List[Dict[str, Any]] = []
    
    with open(csv_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            # Filter out rows with missing critical data
            if row.get('age') and row.get('sex') and row.get('cogstat') and row.get('uresidence'):
                data.append(row)
    
    return data


def main() -> None:
    """Main function to convert CSV to JSON."""
    # Define paths
    csv_path = Path('01-Data-and-Data-Dictionary/unsw_datathon_2025.csv')
    json_path = Path('data.json')
    
    print(f"Loading data from {csv_path}...")
    data = load_csv_data(str(csv_path))
    
    print(f"Loaded {len(data)} records")
    print(f"Saving to {json_path}...")
    
    # Save as JSON
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2)
    
    print(f"Successfully converted {len(data)} records to JSON")
    print(f"File saved to: {json_path.absolute()}")


if __name__ == '__main__':
    main()

