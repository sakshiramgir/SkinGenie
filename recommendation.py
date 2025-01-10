
import pandas as pd
df = pd.read_csv("skincare_product.csv")
def recommend_routines(skin_type, concerns):
    # Ensure case consistency by converting both input and dataset values to lowercase
    skin_type = skin_type.strip().lower()
    
    # Handle concerns input as string or list
    if isinstance(concerns, str):
        concerns = [concern.strip().lower() for concern in concerns.split(",")]
    elif isinstance(concerns, list):
        concerns = [concern.strip().lower() for concern in concerns]
    else:
        raise ValueError("Invalid input for concerns. It must be a string or list.")

    # Standardize dataset values to lowercase for comparison
    df['skintype'] = df['skintype'].str.lower()
    df['notable_effects'] = df['notable_effects'].str.lower()
    df['product_type'] = df['product_type'].str.lower()

    # Filter dataset based on skin type
    filtered_df = df[df['skintype'].str.contains(skin_type, na=False)]
    if filtered_df.empty:
        return {"error": "No products found for the given skin type."}

    # Further filter dataset based on concerns
    filtered_df = filtered_df[filtered_df['notable_effects'].apply(
        lambda x: any(concern in x for concern in concerns))]
    if filtered_df.empty:
        return {"error": "No products found matching the specified concerns."}

    # Get common products for both routines
    facewash = filtered_df[filtered_df['product_type'] == 'face wash']['product_name'].head(1).tolist()
    moisturizer = filtered_df[filtered_df['product_type'] == 'moisturizer']['product_name'].head(1).tolist()

    # Get morning-specific products
    morning_toner = filtered_df[filtered_df['product_type'] == 'toner']['product_name'].head(1).tolist()
    morning_serum = filtered_df[filtered_df['product_type'] == 'serum']['product_name'].head(1).tolist()
    sunscreen = filtered_df[filtered_df['product_type'] == 'sunscreen']['product_name'].head(1).tolist()

    # Get evening-specific products
    evening_toner = filtered_df[filtered_df['product_type'] == 'toner']['product_name'].iloc[1:2].tolist()
    evening_serum = filtered_df[filtered_df['product_type'] == 'serum']['product_name'].iloc[1:2].tolist()

    # Create morning and evening routines
    morning_routine = {
        "facewash": facewash,
        "toner": morning_toner,
        "serum": morning_serum,
        "moisturizer": moisturizer,
        "sunscreen": sunscreen,
    }

    evening_routine = {
        "facewash": facewash,
        "toner": evening_toner,
        "serum": evening_serum,
        "moisturizer": moisturizer,
    }

    return {"morning_routine": morning_routine, "evening_routine": evening_routine}
